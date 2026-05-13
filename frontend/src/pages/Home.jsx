
import BannerSlider from "../components/shared/BannerSlider"
import LiveEvents from "../components/shared/LiveEvents"
import Reccommended from "../components/shared/Reccommended"

const Home = () => {
  return (
    <div>
      <BannerSlider/>
      <Reccommended/>
      <LiveEvents/>
    </div>
  )
}

export default Home
