import Banner from "./homeComponent/Banner";
import ExtraSection from "./homeComponent/ExtraSection";
import FeaturedProducts from "./homeComponent/FeaturedProducts";


const HomeContent = () => {
    return (
        <div>
            <Banner></Banner>
            <div>
                <FeaturedProducts></FeaturedProducts>
            </div>
            <div>
                <ExtraSection></ExtraSection>
            </div>
        </div>
    );
};

export default HomeContent;