import CLIENTS_DB from '@/app/data/clients';

function getClientById(id: string): Client | undefined {
  return CLIENTS_DB.find((provider) => provider.id === parseInt(id));
}

async function getAllClients() {
  const res = await fetch(`${process.env.URL}/api/clients`);
  if (res.ok) {
    const data = await res.json();
    return data;
  }
}

const clients = {
  getClientById,
  getAllClients,
};

export default clients;
