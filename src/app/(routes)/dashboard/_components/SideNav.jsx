import React, {useEffect} from "react";
import Image from "next/image";

import {LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, CircleDollarSign} from 'lucide-react'

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {
    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: LayoutGrid,
        }
    ]
}