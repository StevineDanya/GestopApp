import Link from "next/link";
import Image from "next/image";
import Clients from "@/components/agences";
import TableauAdmin from "@/components/tableauAdmin";


export default function Agences() {
  return (
    <div className="flex">
      {/* J'ai acces au dossier Agences  */}
      <TableauAdmin />
      <Clients />
    </div>
  );
}
