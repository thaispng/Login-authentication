import Header from "../Components/_ui/Header";
import SideMenu from "../Components/_ui/SideMenu";
import Card from "../Components/_ui/Card";
import { Package, MessageSquare, Box, ListCheck, Table } from 'lucide-react';
import CardMetric from "../Components/_ui/CardMetric";
import CardStatus from "../Components/_ui/CardStatus";
import TabelaPedidos from "../Components/Layout/TabelaPedidos";
export default function Inicial() {
  return (
    <>
      <Header />
      <main className="flex flex-row h-full gap-6 pr-6">
      <SideMenu />
        <div className="flex flex-col gap-4 w-full pt-6">
        <div className="flex flex-row gap-4 w-full">
          <Card title="Pedidos" icon={<Package size={48} />} />
          <Card title="Estoque" icon={<Box size={48} color="#18F72E" />} />
          <Card title="Lista escolares" icon={<ListCheck size={48} color="#FFBC12" />} />
        </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-4">

            <CardMetric
              p="Hoje"
              image="/person.svg"
              title="100"
              subtitle="Pedidos para entrega"
            />
            <CardStatus
              title="Total"
              value="100"
              subtitle="Produtos"
            />
            <CardStatus
              title="Total"
              value="2"
              subtitle="Estoque mínimo"
            />
            <CardStatus
              title="Total"
              value="10"
              subtitle="Novos clientes"
              className="col-span-2"
            />
      </div>

      <TabelaPedidos />
        </div>
    </main>
    </>
  );
}
