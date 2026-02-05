import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GetInTouch from '../contact/_components/GetInTouch';
import FAQBanner from './_components/FAQBanner';
import FAQContent from './_components/FAQContent';

const FAQPage = () => {
  return (
    <div>
      <FAQBanner />

      <CustomContainer>
        <FAQContent />

        <GetInTouch />
      </CustomContainer>
    </div>
  );
};

export default FAQPage;
