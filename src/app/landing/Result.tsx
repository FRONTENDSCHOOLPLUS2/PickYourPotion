function Result({ value }: { value: string }) {
  // 받아온 value값으로 데이터 패칭하여 정보 채워넣기

  return (
    <>
      <h2 className="text-center mb-2">
        이런 술이 잘 맞으실것 같아요!
        <br />
        클릭하면 상품 페이지로 이동합니다
      </h2>
      <div className="w-full h-60 bg-slate-500 mb-3">이미지가 들어갈 자리</div>
      <h3 className="mb-2">술 이름</h3>
      <p className="mb-2">술 가격</p>
      <table className="mb-5">
        <tr>
          <td width="30%">도수</td>
          <td height="32px">술 도수</td>
        </tr>
        <tr>
          <td width="30%">산미</td>
          <td height="32px">
            <div className="flex flex-row gap-[1px] h-4 bg-white rounded-full overflow-hidden">
              <span className="bg-primary w-1/4 h-full"></span>
              <span className="bg-primary w-1/4 h-full"></span>
              <span className="bg-primary w-1/4 h-full"></span>
              <span className="bg-lightGray w-1/4 h-full"></span>
            </div>
          </td>
        </tr>
        <tr>
          <td width="30%">당도</td>
          <td height="32px">
            <div className="flex flex-row gap-[1px] h-4 bg-white rounded-full overflow-hidden">
              <span className="bg-primary w-1/4 h-full"></span>
              <span className="bg-primary w-1/4 h-full"></span>
              <span className="bg-primary w-1/4 h-full"></span>
              <span className="bg-lightGray w-1/4 h-full"></span>
            </div>
          </td>
        </tr>
      </table>
    </>
  );
}

export default Result;
