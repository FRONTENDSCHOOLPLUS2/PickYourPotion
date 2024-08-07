import { LinkButton } from "@/components/LinkButton";

function ResultPage({ params: { result } }: { params: { result: string } }) {
  return (
    <div className="result flex flex-col justify-center items-center px-12 py-8 min-h-screen text-center bg-[#FFFAED]">
      <h2 className="text-center mb-5">
        이런 술이 잘 맞으실것 같아요!
        <br />
        클릭하면 상품 페이지로 이동합니다!
      </h2>
      <div className="w-full p-7 mb-6 bg-white rounded-xl">
        <div className="h-60 mb-3 bg-slate-500 rounded-lg overflow-hidden">
          이미지가 들어갈 자리
        </div>
        <h3 className="mb-2">술 이름</h3>
        <p className="mb-2">술 가격</p>
        <table className="mb-5 w-full">
          <tr>
            <td width="30%">도수</td>
            <td height="32px">술 도수</td>
          </tr>
          <tr>
            <td width="30%">산미</td>
            <td height="32px">
              <div className="flex flex-row gap-[1px] h-4 bg-[#FFEDC7] rounded-full overflow-hidden">
                <span className="bg-[#FDC140] w-1/4 h-full rounded-full"></span>
              </div>
            </td>
          </tr>
          <tr>
            <td width="30%">당도</td>
            <td height="32px">
              <div className="flex flex-row gap-[1px] h-4 bg-[#FFE2BA] rounded-full overflow-hidden">
                <span className={`bg-primary w-3/4 h-full rounded-full`}></span>
              </div>
            </td>
          </tr>
        </table>
        <h3 className="mb-2">어울리는 안주</h3>
        <div className="flex flex-wrap justify-center gap-1">
          <p className="py-1 px-3 border-2 border-primary rounded-full">안주 1</p>
          <p className="py-1 px-3 border-2 border-primary rounded-full">안주 2</p>
          <p className="py-1 px-3 border-2 border-primary rounded-full">안주 3</p>
        </div>
      </div>
      <LinkButton className="mb-2 w-full" href="/landing">
        다시 하기
      </LinkButton>
      <LinkButton className="w-full" color="disabled" href="/">
        쇼핑몰로 이동하기
      </LinkButton>
    </div>
  );
}

export default ResultPage;
