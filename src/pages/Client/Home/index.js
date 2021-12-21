import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import "../scss/Home.scss";
import { Link } from "react-router-dom";
import { PRODUCTS_PATH } from "constant/route";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

function Home() {
  const { t } = useTranslation();

  const carouselData = [
    {
      title: "THỊT TRÂU, LỢN GÁC BẾP",
      description:
        "Thịt trâu gác bếp là một những món ăn đặc trưng Điện Biên của đồng bào dân tộc nơi đây. Để làm món thịt trâu ngon, người ta phải lọc cẩn thận hết gân, lọc sạch bạc nhạc, sau đó thái miếng dọc thớ rồi ướp với hỗn hợp gia vị gồm sả, gừng, tỏi, ớt khô băm nhỏ, mắc khén giã nát rồi để khoảng 2-3 tiếng, sau đó lấy que xiên và sấy trên than củi, để xa cho thịt chín từ từ, chín đều. ",
      image:
        "http://media.dulich24.com.vn/bai-viet/nhung-mon-dac-san-noi-tieng-vung-tay-bac-40090222/34b14f6e-466e-4280-b1f5-df690658b049.jpg",
    },
    {
      title: "CÁ HỒI SAPA",
      description:
        "Một trong những món ngon phải thử khi đến Sapa chính là món cá hồi. Cá hồi được nuôi ngay tại Sapa nên thịt luôn tươi, ngon và giá rẻ.",
      image:
        "http://media.dulich24.com.vn/diemden/thi-tran-sapa-6403/c25399c5-2f23-41f7-a434-9a12b4c3bd07-18.jpg",
    },
    {
      title: "CỐM TÚ LỆ",
      description:
        "Xã Tú Lệ, huyện Văn Chấn (Yên Bái) từ lâu đã nổi tiếng với một loại nếp có hạt gạo to tròn, trắng trong. Thứ nếp này khi được đồ thành xôi thì có vị dẻo thơm đặc biệt, còn khi chế biến thành cốm thì lại có thêm hương vị thật ngọt ngào, thanh mát.",
      image:
        "http://media.dulich24.com.vn/bai-viet/nhung-mon-dac-san-noi-tieng-vung-tay-bac-40090222/c8c55c5e-facc-4ff4-aba4-e73675814c02.JPG",
    },
  ];

  const banner1Data = [
    {
      title: "Hoa quả tự nhiên",
      image:
        "http://amigosthemes.com/frutella/frutella-light/assets/images/parts/icons/100/white/tomato-transparent.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
    },
    {
      title: "Không hóa chất độc hại",
      image:
        "http://amigosthemes.com/frutella/frutella-light/assets/images/parts/icons/100/white/dairy-transparent.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
    },
    {
      title: "Bảo tồn tự nhiên",
      image:
        "http://amigosthemes.com/frutella/frutella-light/assets/images/parts/icons/100/white/leafs-transparent.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
    },
  ];

  const freshListData = [
    "Frutella 100 percent Orange Juice is the perfect beverage to pack in lunches or drink on the go",
    " Add Frutella Orange Juice to your daily routine for a delicious and convenient source of vitamin C",
    "Frutella Juice contains important nutrients, including potassium and folic acid",
    "Get this 24 count value juice pack delivered right to your door",
  ];

  const categoriesData = [
    {
      title: "Thịt trâu gác bếp",
      image:
        "https://wna.cdnxbvn.com/wp-content/uploads/2019/02/mon-thit-trau-gac-bep.jpg",
    },
    {
      title: "CÁ HỒI SAPA",
      image:
        "http://media.dulich24.com.vn/diemden/thi-tran-sapa-6403/c25399c5-2f23-41f7-a434-9a12b4c3bd07-18.jpg",
    },

    {
      title: "Lạp xưởng gac bếp",
      image:
        "http://media.dulich24.com.vn/bai-viet%5Can-gi-o-ha-giang-dac-san-ha-giang-quan-an-ngon-o-ha-giang-61112851%5Cmon-ngon-o-ha-giang-16.jpg",
    },
    {
      title: "Xôi ngũ sắc",
      image:
        "http://media.dulich24.com.vn/bai-viet/nhung-mon-dac-san-noi-tieng-vung-tay-bac-40090222/233e059d-c30e-4325-aa81-583e059088e4.jpg",
    },
    {
      title: "Cốm Tú Lệ",
      image:
        "http://media.dulich24.com.vn/bai-viet/nhung-mon-dac-san-noi-tieng-vung-tay-bac-40090222/c8c55c5e-facc-4ff4-aba4-e73675814c02.JPG",
    },
    {
      title: "Cơm lam bắc mê",
      image:
        "http://media.dulich24.com.vn/bai-viet%5Can-gi-o-ha-giang-dac-san-ha-giang-quan-an-ngon-o-ha-giang-61112851%5Cmon-ngon-o-ha-giang-7.jpg",
    },
  ];

  const statsData = [
    {
      title: "Hài lòng",
      image:
        "http://amigosthemes.com/frutella/frutella-light/assets/images/parts/icons/100/white/in-love.png",
      number: 2791,
      sign: "+",
    },
    {
      title: "Chất lượng dịch vụ",
      image:
        "http://amigosthemes.com/frutella/frutella-light/assets/images/parts/icons/100/white/handshake.png",
      number: 99,
      sign: "%",
    },
    {
      title: "An tâm sử dụng",
      image:
        "http://amigosthemes.com/frutella/frutella-light/assets/images/parts/icons/100/white/guarantee.png",
      number: 77,
      sign: "v",
    },
  ];

  const shippingData = [
    {
      title: "Đặt hàng",
      description:
        "Chúng tôi sẽ liên hệ với bạn để xác nhận chi tiết của đơn đặt hàng",
      image:
        "http://amigosthemes.com/frutella/frutella-light/assets/images/parts/icons/50/orange/shopping-basket.png",
    },
    {
      title: "Thanh toán",
      description:
        "Bạn tự chọn khoảng thời gian mà bạn sẽ sử dụng dịch vụ.Thanh toán bằng nhiều cách",
      image:
        "http://amigosthemes.com/frutella/frutella-light/assets/images/parts/icons/50/orange/card-payment.png",
    },
    {
      title: "Giao hàng",
      description:
        "Chuyển phát nhanh sẽ giao hàng vào thời gian thuận tiện cho bạn.",
      image:
        "http://amigosthemes.com/frutella/frutella-light/assets/images/parts/icons/50/orange/shipped.png",
    },
  ];

  return (
    <main className="home-page">
      <section className="carousel-show main-content">
        <Carousel>
          {carouselData.map((item, index) => {
            return (
              <div className="carousel-block">
                <div className="carousel-block__left">
                  <h3 className="left-title">{item.title}</h3>
                  <p className="left-description">{item.description}</p>
                  <Link to={PRODUCTS_PATH} className="left-btn btn">
                    {t("buy now")}
                  </Link>
                </div>
                <div className="carousel-block__right">
                  <img src={item.image} alt="" />
                </div>
              </div>
            );
          })}
        </Carousel>
      </section>
      <section className="banner-1 banner banner--cuver">
        <div className="banner-hidden-text">Features</div>
        <div className="banner-body main-content">
          <h3 className="banner-body__title">
            <p>Thực phẩm sạch mỗi ngày</p>
            <span>100% tự nhiên</span>
          </h3>
          <div className="banner-body__card">
            <ul className="card-list">
              {banner1Data.map((item) => {
                return (
                  <li className="card-item">
                    <div className="card-img">
                      <img src={item.image} alt="card img" />
                    </div>
                    <p className="card-title">{item.title}</p>
                    <p className="card-description">{item.description}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <img
          src="http://amigosthemes.com/frutella/frutella-light/assets/images/content/x/section-strawberry.png"
          alt="decor1"
          className="decor-1"
        />
        <img
          src="http://amigosthemes.com/frutella/frutella-light/assets/images/content/x/section-apricot.png"
          alt="decor2"
          className="decor-2"
        />
      </section>
      {/* <section className="banner-2 banner">
        <div className="banner-hidden-text">Features</div>
        <div className="banner-body main-content">
          <div className="banner-body__left">
            <img
              src="http://amigosthemes.com/frutella/frutella-light/assets/images/content/x/orange-juice.png"
              alt="fresh"
            />
          </div>

          <div className="banner-body__right">
            <h3 className="title">Nước ép cam tươi</h3>
            <p className="description">{t("100% Organic")}</p>
            <ul className="fresh-list">
              {freshListData.map((item) => {
                return (
                  <li className="fresh-item">
                    <i className="bx bxs-droplet"></i>
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
            <Link to={PRODUCTS_PATH} className="link-btn">
              {t("buy now")}
            </Link>
          </div>
        </div>
      </section> */}
      <section className="banner-3 banner banner--cuver">
        <div className="banner-body main-content">
          <h3 className="banner-body__title">
            <p>Sản phẩm của chúng tôi</p>
            <span>Nhưng sản phẩm có chất lượng tốt nhất</span>
          </h3>
          <ul className="cate-list">
            {categoriesData.map((item) => {
              return (
                <li className="cate-item">
                  <div className="cate-item__top">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="cate-item__bottom">
                    <span>{item.title}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <img
          src="http://amigosthemes.com/frutella/frutella-light/assets/images/content/x/section-lime.png"
          alt="decor2"
          className="decor-2"
        />
      </section>
      <section className="banner-4 banner banner--cuver">
        <div className="banner-body main-content">
          <h3 className="banner-body__title">
            <p>Giao hàng và thanh toán</p>
            <span>Nhanh chóng và hiệu quả</span>
          </h3>
          <ul className="shipping-list">
            {shippingData.map((item) => {
              return (
                <li className="shipping-item">
                  <div className="item-top">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="item-bottom">
                    <p className="title">{item.title}</p>
                    <p className="description">{item.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="banner-1 banner-5  banner banner--cuver">
        <div className="banner-hidden-text">{t("Stats")}</div>
        <div className="banner-body main-content">
          <h3 className="banner-body__title">
            <p>Thống kê</p>
            <span>Từ nhưng khách hàng tin dùng</span>
          </h3>
          <div className="banner-body__card">
            <ul className="card-list">
              {statsData.map((item) => {
                return (
                  <li className="card-item">
                    <div className="card-img">
                      <img src={item.image} alt="card img" />
                    </div>
                    <div className="card-right">
                      <VisibilitySensor
                        partialVisibility
                        offset={{ bottom: 200 }}
                      >
                        {({ isVisible }) => {
                          if (isVisible) {
                            return (
                              <span className="card-number">
                                <span>
                                  {isVisible ? (
                                    <CountUp
                                      start={0}
                                      end={item.number}
                                      duration={2}
                                      redraw={false}
                                    />
                                  ) : null}
                                </span>
                                <span>{item.sign}</span>
                              </span>
                            );
                          } else {
                            return (
                              <span className="card-number">
                                <span>{item.number}</span>
                                <span>{item.sign}</span>
                              </span>
                            );
                          }
                        }}
                      </VisibilitySensor>
                      <p className="card-title">{item.title}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <img
          src="http://amigosthemes.com/frutella/frutella-light/assets/images/content/x/section-red-strawberry.png"
          alt="decor1"
          className="decor-3"
        />
        <img
          src="http://amigosthemes.com/frutella/frutella-light/assets/images/content/x/section-blackberry-with-leaves.png"
          alt="decor2"
          className="decor-4"
        />
      </section>
    </main>
  );
}

export default Home;
