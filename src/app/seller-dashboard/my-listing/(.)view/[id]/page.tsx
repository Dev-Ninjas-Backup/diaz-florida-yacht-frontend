import { getBoatDetails } from '@/services/boats/boat-details';
import BoatDetailModal from '../../_components/BoatDetailModal';

export default async function InterceptedBoatView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const boat = await getBoatDetails(id);

  return <BoatDetailModal boat={boat} />;
}
