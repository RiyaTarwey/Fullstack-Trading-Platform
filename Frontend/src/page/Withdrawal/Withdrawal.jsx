import React, { useEffect } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { getWithdrawalHistory } from '@/State/Withdrawal/Action';

const Withdrawal = () => {
  const dispatch = useDispatch();
  const { wallet, withdrawal } = useSelector((store) => store);

  useEffect(()=>{
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")))
  },[])

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
              {withdrawal.history.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <p>{item.date.toString()}</p>
                  </TableCell>

                  <TableCell className=" ">Bank</TableCell>

                  <TableCell className=" ">${item.amount}</TableCell>

                  <TableCell className="text-right">{item.status}</TableCell>
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
