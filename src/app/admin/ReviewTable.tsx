import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table";

function ReviewTable() {
  return (
    <div className="overflow-x-auto">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-60 bg-primary border-0">내용</TableHead>
            <TableHead className="w-48 bg-primary border-0">날짜</TableHead>
            <TableHead className="w-32 bg-primary border-0">회원명</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-left truncate">맛있어요 꺄르륵</TableCell>
            <TableCell>2024-09-11 14:25</TableCell>
            <TableCell>회원명회원명</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left truncate">좋은 술입니다. 아주 좋아요!!!</TableCell>
            <TableCell>2024-09-11 14:25</TableCell>
            <TableCell>회원명회원명</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left truncate">
              또 사고 싶어요. 추석 선물로도 드릴 예정입니다.
            </TableCell>
            <TableCell>2024-09-11 14:25</TableCell>
            <TableCell>회원명회원명</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default ReviewTable;
