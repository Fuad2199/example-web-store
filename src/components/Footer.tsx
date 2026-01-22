import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="mt-16 flex flex-col items-center md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-800 p-8 rounded-lg">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="e-logo"
            width={36}
            height={36}
          />
          <p className="hidden md:block text-md font-medium tracking-wide text-white">
            TRENDPRODUCT
          </p>
        </Link>
        <p className="text-sm text-gray-400">© 2025 TRENDPRODUCT</p>
        <p className="text-sm text-gray-400">All right reserved</p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/">Home Page</Link>
        <Link href="/contact">Contact</Link>       
        <Link href="/contact">Terms of Service</Link>       
        <Link href="/about">Privacy Policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/">All Products</Link>
        <Link href="/about">New Arriwals</Link>
        <Link href="/contact">Best Sellers</Link>
        <Link href="/contact">Sale</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/about">Blog</Link>
        <Link href="/about">Affiliate Program</Link>
      </div>
    </div>
  );
};
