import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../../components/ui/table";

const Withdrawal = () => {
  return (
    <div>
      <div>
        <div className="p-5 lg:p-20">
          <h1 className="font-bold text-3xl pb-5">Withdrawal</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] py-5 ">DATE</TableHead>
                <TableHead className="w-1/4">Method</TableHead>
                <TableHead className="w-1/4">Amount</TableHead>
                <TableHead className="text-right w-1/4 ">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <p>June 2, 2026 at 11:43</p>
                  </TableCell>

                  <TableCell className=" ">Bank</TableCell>

                  <TableCell className=" ">$69249</TableCell>

                  <TableCell className="text-right">345</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Withdrawal
