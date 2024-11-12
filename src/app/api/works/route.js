export async function GET() {
  const portfolioItems = [
    {
      id: 1,
      title: "무더위를 끄고 청량함을 켜다",
      description: "여름 시즌 하이네켄 맥주 옥외광고 캠페인",
      image: "https://cdn.imweb.me/thumbnail/20201216/790985fc44784.jpeg",
      date: "2024. 07",
      client: "하이네켄",
      location: "Korea",
    },
    {
      id: 2,
      title: "K뷰티 옥외광고의 정석",
      description: "화장품 브랜드 달바 강북, 여의도 옥외광고 캠페인",
      image:
        "https://cdn-pro-web-40-6.cdn-nhncommerce.com/dalbapiedmot_godomall_com/data/img/product/detail/39/4_pdt.jpg",
      date: "2024. 06",
      client: "달바",
      location: "Korea",
    },
  ];

  return new Response(JSON.stringify(portfolioItems), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
