"use server";

import {
  AddFundingSourceParams,
  CreateFundingSourceOptions,
  NewDwollaCustomerParams,
  TransferParams,
} from "@/types";
import { Client } from "dwolla-v2";

function getEnvironment(): "production" | "sandbox" {
  const environment = process.env.DWOLLA_ENV as string;

  switch (environment) {
    case "sandbox":
      return "sandbox";
    case "production":
      return "production";
    default:
      throw new Error(
        "Dwolla environment should either be set to 'sandbox' or 'production'"
      );
  }
}

const dwollaClient = new Client({
  environment: getEnvironment(),
  key: process.env.DWOLLA_KEY as string,
  secret: process.env.DWOLLA_SECRET as string,
});

// create a Dwolla Funding Source using a Plaid Processor Token
export async function createFundingSource(options: CreateFundingSourceOptions) {
  try {
    return await dwollaClient
      .post(`customers/${options.customerId}`, {
        name: options.fundingSourceName,
        plaidToken: options.plaidToken,
      })
      .then((res) => res.headers.get("location"));
  } catch (error) {
    console.error("Creating a Funding Source Failed: ", error);
  }
}

export async function createOnDemandAuthorization() {
  try {
    const onDemandAuthorization = await dwollaClient.post(
      "on-demand-authorizations"
    );
    const authLink = onDemandAuthorization.body._links;
    return authLink;
  } catch (error) {}
}

export async function createDwollaCustomer(
  newCustomer: NewDwollaCustomerParams
) {
  try {
    console.log(newCustomer);
    return await dwollaClient
      .post("customers", newCustomer)
      .then((res) => res.headers.get("location"));
  } catch (error) {
    console.error("Creating a Dwolla Customer Failed: ", error);
  }
}

export async function createTransfer({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: TransferParams) {
  try {
    const requestBody = {
      _links: {
        source: {
          href: sourceFundingSourceUrl,
        },
        destination: {
          href: destinationFundingSourceUrl,
        },
      },
      amount: {
        currency: "USD",
        value: amount,
      },
    };

    return await dwollaClient
      .post("transfers", requestBody)
      .then((res) => res.headers.get("location"));
  } catch (error) {
    console.error("Transfer fund failed: ", error);
  }
}

export async function addFundingSource({
  dwollaCustomerId,
  processorToken,
  bankName,
}: AddFundingSourceParams) {
  try {
    // create dwolla auth link
    const dwollaAuthLinks = await createOnDemandAuthorization();

    // add funding source to the dwolla customer & get the funding source url
    const fundingSourceOptions = {
      customerId: dwollaCustomerId,
      fundingSourceName: bankName,
      plaidToken: processorToken,
      _links: dwollaAuthLinks,
    };

    return await createFundingSource(fundingSourceOptions);
  } catch (error) {
    console.error("Transfer fund failed: ", error);
  }
}
