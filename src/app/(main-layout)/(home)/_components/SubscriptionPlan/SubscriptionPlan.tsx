import subsImg from '@/assets/yacht-images/subscription.png';
import SubscriptionCard from '@/components/SubscriptionPlan/SubscriptionCard';
import { getAllSubscription } from '@/services/main/subscription';
import {
  SubscriptionApiResponse,
  SubscriptionPlan as SubscriptionPlanType,
} from '@/types/subscription-types';
import Image from 'next/image';

const SubscriptionPlan = async () => {
  const { data: subscriptions } = await getAllSubscription();

  const subscriptionPlans: SubscriptionPlanType[] = subscriptions?.map(
    (plan: SubscriptionApiResponse) => ({
      id: plan.id,
      name: plan.title,
      price: plan.price,
      currency: plan.currency,
      billingCycle: `month`,
      featured: plan.isBest,
      featuredLabel: plan.isBest ? 'Most Popular' : undefined,
      features: plan.benefits,
      buttonText: 'Get Started',
      buttonStyle: plan.planType === 'PLATINUM' ? 'primary' : 'dark',
    }),
  );

  return (
    <div className="min-h-screen px-2 md:px-5">
      <div className="h-full md:h-[1850px]  relative bg-[#00384D] rounded-2xl">
        <div className="md:h-[1215px] relative">
          <Image
            src={subsImg}
            alt="Subscription Plan"
            width={1200}
            height={900}
            className="w-full"
          />
          <div className="absolute bottom-[1%] md:bottom-0 px-[4%] xl:px-[15%] 2xl:px-[30%] flex flex-col items-center justify-center w-full text-center text-white space-y-3 md:space-y-10 ">
            <h1 className="text-sm sm:text-4xl xl:text-5xl 2xl:text-6xl font-bold">
              Looking to Sell Your Boat? Pick your perfect plan.
            </h1>
            <p className="text-xs md:text-xl">
              Reach thousands of qualified buyers in Florida’s most active yacht
              marketplace.
            </p>
          </div>
        </div>
        <div className="md:absolute md:bottom-[15%] md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 w-full max-w-7xl px-4 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {subscriptionPlans?.reverse()?.map((plan) => (
              <SubscriptionCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
