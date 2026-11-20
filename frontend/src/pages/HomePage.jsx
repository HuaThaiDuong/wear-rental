import SearchForm from "../components/SearchForm.jsx";
import CategoryList from "../components/CategoryList.jsx";
import PromoCards from "../components/PromoCards.jsx";
import PopularProducts from "../components/PopularProducts.jsx";
import Steps from "../components/Steps.jsx";
import "./HomePage.css";

export default function HomePage() {
  return (
    <main className="container home">
      <section>
        <h1 className="home__title">Hôm nay bạn cần mặc gì?</h1>
        <SearchForm />
      </section>

      <CategoryList />
      <PromoCards />
      <PopularProducts />
      <Steps />
    </main>
  );
}