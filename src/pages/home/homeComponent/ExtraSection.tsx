import Qyery from "./Query";
import Testimonial from "./Testimonial";







export default function ExtraSection() {
  return (
    <div className="container mx-auto px-4 py-12">
      
      <div>
        <Testimonial></Testimonial>
      </div>
      <div>
        <Qyery></Qyery>
      </div>
      {/* <div>
        <BrandScroller></BrandScroller>
      </div> */}
    </div>
  );
}
