"use client";

import { logoutAccount } from "@/lib/actions/user.actions";
import { FooterProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Footer({ user, type = "desktop" }: FooterProps) {
  const router = useRouter();
  async function handleLogout() {
    const loggedOut = await logoutAccount();

    if (loggedOut) router.push("/sign-in");
  }

  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">{user?.name[0]}</p>
      </div>
      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer-email"}
      >
        <h1 className="text-14 truncate font-semibold text-gray-700">
          {user?.name}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {user?.email}
        </p>
      </div>
      <div className="footer_image" onClick={handleLogout}>
        <Image src="icons/logout.svg" alt="jsm" fill />
      </div>
    </footer>
  );
}
export default Footer;
