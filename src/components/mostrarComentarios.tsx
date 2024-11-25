import { IonCard, IonCardContent, IonIcon } from "@ionic/react";
import { useEffect, useState } from "react";
import { starOutline, star } from "ionicons/icons"; // Usamos Ionicons

// Define la interfaz para los comentarios
interface Comentario {
  idComentario: number;
  IdProducto: number;
  calificacion: number;
  comentario: string;
}

// Define los props del componente
interface MostrarComentariosProps {
  IdProducto: number;
}

const MostrarComentarios: React.FC<MostrarComentariosProps> = ({ IdProducto }) => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/comentariosid?IdProducto=${IdProducto}`
        );
        if (!response.ok) {
          throw new Error(`Error al obtener los comentarios: ${response.statusText}`);
        }
        const data: Comentario[] = await response.json(); // Convierte la respuesta a JSON
        setComentarios(data); // Actualiza el estado con los comentarios obtenidos
      } catch (error) {
        console.error("Error al obtener los comentarios:", error);
      }
    };

    fetchComentarios();
  }, [IdProducto]);

  // Función para mostrar las estrellas basadas en la calificación
  const renderStars = (calificacion: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= calificacion) {
        stars.push(<IonIcon key={i} icon={star} style={{ color: "gold", fontSize: "20px" }} />);
      } else {
        stars.push(<IonIcon key={i} icon={starOutline} style={{ color: "gray", fontSize: "20px" }} />);
      }
    }
    return stars;
  };

  return (
    <div>
      {comentarios.map((comentario) => (
        <IonCard key={comentario.idComentario}>
          <IonCardContent>
            <p>
              <strong>Calificación:</strong> {renderStars(comentario.calificacion)}
            </p>
            <p>{comentario.comentario}</p>
          </IonCardContent>
        </IonCard>
      ))}
    </div>
  );
};

export default MostrarComentarios;
