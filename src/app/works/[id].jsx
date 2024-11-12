import { useRouter } from "next/router";

export default function WorkDetail() {
  const router = useRouter();
  const { id } = router.query;

  // 실제 데이터에 따라 상세 내용을 가져와서 렌더링
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Project {id} Details</h1>
        <p>여기에 프로젝트 {id}의 상세 내용을 추가하세요.</p>
      </div>
    </div>
  );
}
