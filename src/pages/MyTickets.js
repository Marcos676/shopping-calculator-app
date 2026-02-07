import "../styles/MyTickets.css";
import { parseISO, format } from 'date-fns';
import { useState, useEffect } from "react";


export const MyTickets = ({handleModalContent}) => {
 const [tickets, setTickets] = useState([]);

    const getTickets = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + "ticket", {
          method: "GET",
          credentials: "include",
        });
        switch (response.status) {
            case 200:
                let tickets = await response.json()
                // parcea la fecha de creacion de cada ticket
                tickets.forEach(ticket => {
                    ticket.created_at = format(parseISO(ticket.created_at), 'dd/MM/yyyy')
                });
                setTickets(tickets)
            break;
        
            default:
                break;
        }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
getTickets()
    }, [])

  return (
    <>
      <div className="title-description">
        <h2>Mis Tickets</h2>
      </div>
      <ul className="ticket-list" >
        {tickets.map(({id, name, products_list, created_at}) => {
            return (<li className={`item-list item-id-${id}`} key={id} onClick={() => handleModalContent("TicketDetail", "", "", "", {name, products: products_list, created_at})}><div>{name}</div><div>{created_at}</div></li>)
        })}
        
{/*         <li className="item-list"><div>Coto</div><div>1/02/2026</div></li>
        <li className="item-list"><div>Coto</div><div>1/02/2026</div></li>
        <li className="item-list"><div>Coto</div><div>1/02/2026</div></li>
        <li className="item-list"><div>Coto</div><div>1/02/2026</div></li>
        <li className="item-list"><div>Coto</div><div>1/02/2026</div></li>
        <li className="item-list"><div>Coto</div><div>1/02/2026</div></li>
        <li className="item-list"><div>Coto</div><div>1/02/2026</div></li>
        <li className="item-list"><div>Coto</div><div>1/02/2026</div></li>
        <li className="item-list"><div>Coto</div><div>1/02/2026</div></li>
        <li className="item-list"><div>Coto</div><div>1/02/2026</div></li>
        <li className="item-list"><div>Coto</div><div>1/02/2026</div></li>
        <li className="item-list"><div>Coto</div><div>1/02/2026</div></li>
         */}
      </ul>
    </>
  );
};
