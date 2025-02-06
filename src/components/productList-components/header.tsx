"use client";
import Link from "next/link";
import { useState } from "react";
import {
  FiPhone,
  FiMail,
  FiInstagram,
  FiYoutube,
  FiFacebook,
  FiTwitter,
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
import Image from "next/image";
import { useCart } from "@/components/cart-components/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, wishlist } = useCart();

  // Calculate total quantity of items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total quantity of items in wishlist
  const totalWishlistItems = wishlist.length;

  return (
    <div className="overflow-x-hidden">
      {/* Header Section */}
      <div className="bg-[#23856D] py-4 hidden lg:block">
        <div className="container mx-auto flex justify-between items-center text-white text-sm">
          {/* Contact Information */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FiPhone />
              <p>(+92) 12345678</p>
            </div>
            <div className="flex items-center gap-1">
              <FiMail />
              <p>example@gmail.com</p>
            </div>
          </div>

          {/* Promotion */}
          <p className="hidden md:block">
            Follow Us and get a chance to win 80% off
          </p>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <p className="hidden md:block">Follow Us:</p>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiInstagram />
            </Link>
            <Link
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiYoutube />
            </Link>
            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiFacebook />
            </Link>
            <Link
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiTwitter />
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar Section */}
      <div className="bg-white shadow-md border-b-2 border-[#E5E5E5] relative z-40">
        <div className="container mx-auto flex items-center justify-between py-4">
          {/* Logo */}
          <Link href={"/"}>
            <div className="text-2xl font-bold text-[#252B42] hover:text-slate-600 ml-2">
              Bandage
            </div>
          </Link>

          {/* Action Icons (Mobile and Desktop) */}
          <div className="flex items-center gap-4 md:hidden">
            <FiSearch className="text-2xl text-[#737373] cursor-pointer" />
            <Link href={"/cart"}>
              <div className="relative">
                <FiShoppingCart className="text-2xl text-[#737373] cursor-pointer" />
                {totalItems > 0 && (
                  <span className="absolute -top-3 -right-3 bg-[#23A6F0] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
            <Link href={"/wishlist"}>
              <div className="relative">
                <FiHeart className="text-2xl text-[#737373] cursor-pointer" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-3 -right-3 bg-[#23A6F0] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalWishlistItems}
                  </span>
                )}
              </div>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="text-3xl text-[#252B42]" />
              ) : (
                <Image
                  src={"/menu-icon.png"}
                  alt="icon"
                  width={23}
                  height={14}
                  className="mr-3"
                />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex">
            <ul className="flex gap-8 text-sm font-medium text-[#737373] relative">
              <li>
                <Link href="/" className="hover:text-[#23A6F0] transition-all">
                  Home
                </Link>
              </li>
              <li className="relative group">
                <Link
                  href="/productList"
                  className="flex items-center gap-1 hover:text-[#23A6F0] transition-all"
                >
                  Shop
                  <FiChevronDown />
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-[#23A6F0] transition-all"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#23A6F0] transition-all"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#23A6F0] transition-all"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#23A6F0] transition-all"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="hover:text-[#23A6F0] transition-all"
                >
                  Team
                </Link>
              </li>
            </ul>
          </nav>

          {/* Action Icons for Desktop */}
          <div className="hidden md:flex items-center gap-6 text-[#23A6F0]">
            <button className="text-sm font-medium flex items-center gap-2">
              Login/Register
            </button>

            <FiSearch className="text-lg cursor-pointer" />
            <Link href={"/cart"}>
              <div className="relative">
                <FiShoppingCart className="text-lg cursor-pointer" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-[#737373] text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
            <Link href={"/wishlist"}>
              <div className="relative">
                <FiHeart className="text-lg cursor-pointer" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-[#737373] text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalWishlistItems}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden bg-white shadow-md transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col gap-6 p-4 text-[20px] text-[#737373] text-center">
            <li>
              <Link href="/" className="hover:text-[#23A6F0] transition-all">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/productList"
                className="hover:text-[#23A6F0] transition-all"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-[#23A6F0] transition-all"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-[#23A6F0] transition-all"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-[#23A6F0] transition-all"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-[#23A6F0] transition-all"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/team"
                className="hover:text-[#23A6F0] transition-all"
              >
                Team
              </Link>
            </li>
          </ul>
          {/* Action Icons */}
          <div className="flex flex-col gap-4 items-center py-4">
            <button className="text-sm font-medium flex items-center gap-2 text-[#23A6F0]">
              Login/Register
            </button>

            {/* Other Icons */}
            <div className="flex gap-6 text-[#23A6F0]">
              <FiSearch className="text-2xl cursor-pointer" />
              <div className="relative">
                <FiShoppingCart className="text-2xl cursor-pointer" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="relative">
                <FiHeart className="text-2xl cursor-pointer" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalWishlistItems}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
