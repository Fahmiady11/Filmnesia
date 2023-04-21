import { BREAKPOINTS } from "../component/Breakpoints";
import Navbar from "../component/Navbar";
import Text from "../component/Text";
import Title from "../component/Title";
import useBreakpoint from "use-breakpoint";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import QuickCard from "../component/Quickcard";
import { useEffect, useState } from "react";
import {
  IconAlien,
  IconHeart,
  IconMoodHappy,
  IconSword,
  IconTrekking,
} from "@tabler/icons";
import axios from "axios";
import Footer from "../component/Footer";
import useDataStore from "../store/dataStore";

export default function HalamanUtama() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "xs");
  const [menuIndex, setMenuIndex] = useState(0);
  const setData = useDataStore((state) => state.setData);
  const setData2 = useDataStore((state) => state.setData2);
  const data = useDataStore((state) => state.data);
  const data2 = useDataStore((state) => state.data2);

  const doChangeTabIndex = (e) => {
    setMenuIndex(parseInt(e.currentTarget.value));
  };

  const getData = () => {
    try {
      axios
        .get("http://api.tvmaze.com/search/shows?q=girls")
        .then((res) => setData(res?.data));
    } catch (err) {
      console.log(err);
    }

    try {
      axios
        .get("http://api.tvmaze.com/search/shows?q=boys")
        .then((res) => setData2(res?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="font-inter min-h-screen min-w-screen max-w-screen">
      <Navbar />
      <div
        style={{
          backgroundImage: "url('/assets/image/bg.jpeg')",
        }}
        className="pt-24 pb-12 bg-cover bg-center h-full text-center co"
      >
        <div className="px-4 sm:px-12 text-custom-white mx-auto text-center w-full h-full">
          <p className="font-bold text-4xl lg:text-title drop-shadow-md">
            Daftar Rekomendasi Film
          </p>
          <p className="sm:mt-4 text-xs sm:text-base font-semibold drop-shadow-md">
            Mari lihat daftar film kesukaan kalian
          </p>
        </div>
        <div className="px-4 my-2 sm:my-8">
          <div className="font-medium max-w-3xl mx-auto">
            <div
              style={{
                gridTemplateColumns: "repeat(5, 1fr)",
              }}
              className="scrollbar-custom text-xs sm:text-base grid bg-neutral-200 rounded-full border-2 border-neutral-200"
            >
              <button
                value={0}
                onClick={doChangeTabIndex}
                className={`${
                  menuIndex === 0 ? "bg-white shadow-custom" : "bg-transparent"
                } transition-all font-medium border-2 rounded-full p-2.5 flex items-center justify-center gap-2`}
              >
                <IconSword className="h-5 w-5" />
                <p>Action</p>
              </button>
              <button
                value={1}
                onClick={doChangeTabIndex}
                className={`${
                  menuIndex === 1 ? "bg-white shadow-custom" : "bg-transparent"
                } transition-all font-medium border-2 rounded-full p-2.5 flex items-center justify-center gap-2`}
              >
                <IconTrekking className="h-5 w-5" />
                <p>Adventure</p>
              </button>
              <button
                value={2}
                onClick={doChangeTabIndex}
                className={`${
                  menuIndex === 2 ? "bg-white shadow-custom" : "bg-transparent"
                } transition-all font-medium border-2 rounded-full p-2.5 flex items-center justify-center gap-2`}
              >
                <IconHeart className="h-5 w-5" />
                <p>Romance</p>
              </button>
              <button
                value={3}
                onClick={doChangeTabIndex}
                className={`${
                  menuIndex === 3 ? "bg-white shadow-custom" : "bg-transparent"
                } transition-all font-medium border-2 rounded-full p-2.5 flex items-center justify-center gap-2`}
              >
                <IconAlien className="h-5 w-5" />
                <p>Mystery</p>
              </button>
              <button
                value={4}
                onClick={doChangeTabIndex}
                className={`${
                  menuIndex === 4 ? "bg-white shadow-custom" : "bg-transparent"
                } transition-all font-medium border-2 rounded-full p-2.5 flex items-center justify-center gap-2`}
              >
                <IconMoodHappy className="h-5 w-5" />
                <p>Comedy</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="px-4 py-4 md:py-8">
          <Title className="text-center">
            Film <span className="text-custom-primary_red">Populer</span>{" "}
            Terbaru
          </Title>
          <Text className="text-center">
            Kami menawarkan rekomendasi populer terbaru untuk menemani anda
          </Text>

          <div className="max-w-7xl mx-auto">
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
                        link="/wisata1"
                      />
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
        <div className="px-4 py-4 md:py-8">
          <Title className="text-center">
            Film <span className="text-custom-primary_red">Rating</span>{" "}
            Terbanyak
          </Title>
          <Text className="text-center">
            Kami menawarkan rekomendasi populer terbaru untuk menemani anda
          </Text>

          <div className="max-w-7xl mx-auto">
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
              {data2 &&
                data2?.map((v, i) => (
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
