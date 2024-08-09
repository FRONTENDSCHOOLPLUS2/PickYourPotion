import Image from "next/image";
import AdminInput from "./AdminInput";
import AdminSelect from "./AdminSelect";
import FileUpload from "@/../public/images/icons/icon-file-upload.svg";
import Button from "@/components/Button";

export default function AdminPage() {
  const category = [
    { value: "takjoo", name: "탁주" },
    { value: "chungjoo", name: "약·청주" },
    { value: "gwasiljoo", name: "과실주" },
    { value: "jungryujoo", name: "증류주" },
  ];

  const capacity = [
    { value: "ml", name: "ml" },
    { value: "L", name: "L" },
  ];

  return (
    <main className="flex flex-col gap-9 pt-9">
      <AdminInput id="productName" name="productName" type="text" labelChildren="상품명" />
      <AdminInput id="brewery" name="brewery" type="text" labelChildren="양조장" />
      <AdminInput id="price" name="price" type="number" labelChildren="가격">
        {"원"}
      </AdminInput>
      <AdminSelect id="category" name="category" labelChildren="주종" category={category} />
      <AdminInput id="degree" name="degree" type="number" labelChildren="도수">
        {"%"}
      </AdminInput>
      <div className="flex items-end space-x-4">
        <AdminInput
          id="degree"
          name="degree"
          type="number"
          labelChildren="용량"
          className="w-2/3"
        />
        <AdminSelect id="capacity" name="capacity" category={capacity} className="grow" />
      </div>

      <div>
        <p className="mb-3 subTitleMedium">상세설명</p>
        <Image src={FileUpload} alt="사진을 추가할 수 있는 버튼" />
        <textarea className="w-full p-5 mt-3 border h-96 border-gray round focus:outline-none focus:border-primary subTitle" />
      </div>
      <Button className="w-full h-16 mb-10">{"업로드"}</Button>
    </main>
  );
}
