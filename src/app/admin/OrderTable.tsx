import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table";

function OrderTable() {
  return (
    <div className="overflow-x-auto">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-48 bg-primary border-0">주문번호</TableHead>
            <TableHead className="w-60 bg-primary border-0">회원아이디</TableHead>
            <TableHead className="w-32 bg-primary border-0">주문상태</TableHead>
            <TableHead className="w-60 bg-primary border-0">요청사항</TableHead>
            <TableHead className="w-48 bg-primary border-0">주문날짜</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>2024091112341234</TableCell>
            <TableCell>zualzual0119@gmail.com</TableCell>
            <TableCell>입금대기중</TableCell>
            <TableCell>집 앞에 놔주세요 감사합니다</TableCell>
            <TableCell>2024-09-11 14:25</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2024091112341234</TableCell>
            <TableCell>zualzual0119@gmail.com</TableCell>
            <TableCell>입금대기중</TableCell>
            <TableCell>집 앞에 놔주세요 감사합니다</TableCell>
            <TableCell>2024-09-11 14:25</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2024091112341234</TableCell>
            <TableCell>zualzual0119@gmail.com</TableCell>
            <TableCell>입금대기중</TableCell>
            <TableCell>집 앞에 놔주세요 감사합니다</TableCell>
            <TableCell>2024-09-11 14:25</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default OrderTable;
