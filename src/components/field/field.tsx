import { IonInput, IonLabel } from "@ionic/react";
import "./field.css";

interface Propiedades {
  label: string;
  name: string;
  setName: any;
  placeholder: string;
  tipo: any;
}

const CustomField: React.FC<Propiedades> = ({
  label,
  placeholder,
  name,
  setName,
  tipo,
}) => {
  return (
    <div className="field">
      <IonLabel className="fieldLabel">
        {label}
        {/*error && (
          <p className="animate__animated animate__bounceIn">{errorMessage}</p>
        )*/}
      </IonLabel>
      <IonInput
        className="customInput"
        value={name}
        placeholder={placeholder}
        onIonChange={(e) => setName(e.detail.value!)}
        type={tipo}
      />
    </div>
  );
};

export default CustomField;
