import { getBoatDetails } from '@/services/boats/boat-details';
import BoatListingForm from '../../_components/BoatListingForm';

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const boat = await getBoatDetails(id);

  return <BoatListingForm mode="edit" boatData={boat} />;
}
