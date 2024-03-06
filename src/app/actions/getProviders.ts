import PROVIDERS_DB from '@/app/data/providers';

function getProviderById(id: string | number) {
  return PROVIDERS_DB.find((provider) => provider.id === parseInt(id));

  // const res = await fetch(`${process.env.URL}/api/provider/${id}`);
  // if (res.ok) {
  //   const data = await res.json();
  //   return data;
  // }
}

function getAllProviders() {
  return PROVIDERS_DB;
  // const res = await fetch(`${process.env.URL}/api/providers`);
  // if (res.ok) {
  //   const data = await res.json();
  //   return data;
  // }
}

const providers = {
  getProviderById,
  getAllProviders,
};

export default providers;
