import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GetInTouch from '../contact/_components/GetInTouch';
import PrivacyPolicyBanner from './_components/PrivacyPolicyBanner';
import PrivacyPolicyContent from './_components/PrivacyPolicyContent';

const PrivacyPolicyPage = () => {
  return (
    <div>
      <PrivacyPolicyBanner />

      <CustomContainer>
        <PrivacyPolicyContent />

        <GetInTouch />
      </CustomContainer>
    </div>
  );
};

export default PrivacyPolicyPage;
