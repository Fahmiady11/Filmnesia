import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "../component/Breakpoints";
import Wrapper from "../component/Wrapper";
import Navbar from "../component/Navbar";
import MainContent from "../component/MainContent";
import BreadCrumbs from "../component/BreadCrumbs";
import Container from "../component/Container";
import Rating from "../component/Rating";
import { IconMapPin } from "@tabler/icons";
import Footer from "../component/Footer";
import DateInput from "../component/DateInput";
import PopOver from "../component/PopOver";
import { Link, useParams } from "react-router-dom";
import ReviewCard from "../component/ReviewCard";
import QuickCard from "../component/Quickcard";
import useDataStore from "../store/dataStore";

export default function DetailPage({}) {
  let { userId } = useParams();
  const data = useDataStore((state) => state.data);
  const data2 = useDataStore((state) => state.data2);
  const [dataTemp, setDataTemp] = useState([]);
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "xs");
  const [order, setOrder] = useState({
    date: new Date().toISOString().split("T")[0],
    options: {
      people: 1,
    },
  });

  const doChangeDate = ({ name, value }) => {
    setOrder({ ...order, [name]: value });
  };

  const doChangeOrderOptions = (e) => {
    setOrder({
      ...order,
      options: {
        ...order.options,
        [e.currentTarget.name]: parseInt(e.currentTarget.value),
      },
    });
  };

  useEffect(() => {
    [...data, ...data2]
      .filter((data) => data?.show?.id == userId)
      .map((data) => setDataTemp(data));
  }, [userId]);

  return (
    <Wrapper>
      <Navbar />
      <MainContent>
        {console.log(dataTemp)}
        <div className="flex flex-row md:flex-col items-center justify-between md:items-stretch w-full">
          <BreadCrumbs
            pages="Wisata"
            breads={[
              { link: "/", name: "Film" },
              { link: "/1", name: "Detail" },
            ]}
          />
        </div>
        <div
          className="flex flex-col md:grid md:grid-cols-2 gap-3 w-full h-full"
          style={{ gridTemplateColumns: "1fr auto" }}
        >
          {/* Description */}
          <div className="flex flex-col w-full h-full">
            <img src={dataTemp?.show?.image?.original} alt="gambar" className="rounded-md" />
            <Container className="mt-4 flex flex-col gap-1">
              <Rating count={dataTemp?.show?.rating?.average} />
              <p className="font-bold text-xl">{dataTemp?.show?.name}</p>
              <div className="flex flex-row gap-1 items-center">
                <IconMapPin size={18} strokeWidth={2} color={"#615A56"} />
                <p className="md:text-[0.75rem] text-[0.5rem] font-normal">
                  Jl. Siwalan Pangarangan, Sumenep, Pulau Madura 69417 Indonesia
                </p>
              </div>
              <div className="text-[12px] text-justify pt-2" dangerouslySetInnerHTML={{ __html: dataTemp?.show?.summary }} />
            </Container>
          </div>
          {/* Price Detail */}
          <Container className="!flex !flex-col !justify-between !gap-3 md:!gap-6">
            <div className="flex flex-col">
              <p className="flex flex-row  font-semibold text-[1rem] text-[#D2001A]">
                50.000
                <span className="ml-1 font-normal text-[1rem] text-[#615A56]">
                  /Person
                </span>
              </p>
              <hr className="border-[0.5px]/30 border-[#ABACAC] my-3" />
              <div className="flex flex-col items-center gap-1 w-full">
                <p className="after:content-['*'] w-full text-left text-[12px]">
                  Tanggal Tiket
                </p>
                <DateInput
                  name="date"
                  value={order.date}
                  onChange={doChangeDate}
                  containerClassName="w-full"
                />
              </div>
              <div className="flex flex-col items-center gap-1 w-full mt-3">
                <p className="after:content-['*'] w-full text-left text-[12px]">
                  Person
                </p>
                <PopOver
                  containerClassName="w-full"
                  options={order.options}
                  onChange={doChangeOrderOptions}
                  name="Person"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <p className="font-semibold text-[1rem]">Total</p>
                <p className="flex flex-row  font-semibold text-[1rem] text-[#D2001A]">
                  Rp<span className="ml-1 font-semibold">50.000</span>
                </p>
              </div>
              <Link to="#">
                <p className="font-medium text-center mt-3 hover:bg-secondary-yellow/80 text-base text-black bg-[#FDD05C] py-3 px-14 rounded-md shadow-md cursor-pointer">
                  Pesan Sekarang
                </p>
              </Link>
            </div>
          </Container>
        </div>
        {/* Ulasan */}
        <div className="w-full mt-8 flex flex-col gap-3">
          <h2>Ulasan Pengguna</h2>
          <Container className="!flex !flex-col md:!flex-row !gap-3 md:!gap-6">
            <div className="flex flex-col gap-2 w-1/2 md:w-[20%]">
              <p>Ulasan Pengguna</p>
              <Rating.descripted rate={dataTemp?.show?.rating?.average} />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-[80%]">
              <p>Ulasan yang mungkin membantumu</p>
              <div className="flex flex-row gap-4 scrollbar-hide cursor-pointer overflow-x-scroll w-full">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={
                    breakpoint === "xs"
                      ? 1.3
                      : breakpoint === "sm"
                      ? 2.3
                      : breakpoint === "md"
                      ? 2.3
                      : breakpoint === "lg"
                      ? 2.8
                      : breakpoint === "xl"
                      ? 3.6
                      : breakpoint === "2xl"
                      ? 3.6
                      : 1.6
                  }
                  // loop={loopUlasan}
                >
                  {[...Array(6)].map((item, i) => {
                    return (
                      <SwiperSlide key={i.toString()}>
                        <ReviewCard />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </Container>
        </div>
        <div className="mt-8">
          <h2>Wisata Serupa</h2>
          <Swiper
            spaceBetween={0}
            slidesPerView={
              breakpoint === "xs"
                ? 1.5
                : breakpoint === "sm"
                ? 2.2
                : breakpoint === "md"
                ? 2.5
                : breakpoint === "lg"
                ? 3.2
                : breakpoint === "xl"
                ? 3.5
                : breakpoint === "2xl"
                ? 4.2
                : 4.5
            }
          >
            {data &&
              data?.map((v, i) => (
                <SwiperSlide key={i.toString()}>
                  <Link to={`/${v?.show?.id}`}>
                    <QuickCard
                      imageUrl={v?.show?.image?.original}
                      title={v?.show?.name}
                      genre={v?.show?.genres}
                      review_count={v?.show?.rating?.average}
                    />
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </MainContent>
      <Footer />
    </Wrapper>
  );
}
