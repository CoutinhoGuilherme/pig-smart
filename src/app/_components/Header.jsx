'use client'

import React from "react";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
    const { user, isSignedIn } = useUser();
    return (
        <div className="p-5 flex justify-between items-center border shadow-sm">
            <div className="flex flex-row items-center">
                <Image src={"/piggy-bank.svg"} alt="PigSmart" width={50} height={50} />
                <span className="text-green-600 font-bold text-xl">PigSmart</span>
            </div>
            {isSignedIn ? (<UserButton />) : (
                <div className=" flex gap-3 items-center">
                    <Link href='dashboard'>
                    <Button variant="outline" className="rounded-full">
                        Dashboard
                    </Button>
                    <Button variant="outline" className="rounded-full">
                        Get Started
                    </Button>
                    </Link>
                </div>)}
                </div>
    )
}


            export default Header;