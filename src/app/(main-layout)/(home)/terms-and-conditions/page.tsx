import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GetInTouch from '../contact/_components/GetInTouch';
import TermsBanner from './_components/TermsBanner';
import TermsContent from './_components/TermsContent';

const TermsAndConditionsPage = () => {
  return (
    <div>
      
      <TermsBanner />
      
      <CustomContainer>
        <TermsContent />
        
        <GetInTouch />
      </CustomContainer>
    </div>
  );
};

export default TermsAndConditionsPage;
