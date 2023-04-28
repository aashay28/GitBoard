import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumb";
import CardOne from "../components/CardOne";

const Calendar = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Calendar" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
      </div>
    </DefaultLayout>
  );
};

export default Calendar;