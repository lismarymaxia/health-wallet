import { IonInput, IonLabel } from "@ionic/react";
import "./field.css";

interface Propiedades {
  label: string;
  placeholder: string;
  name: string;
  setName: any;
  tipo: any;
  handleSave: any;
}

const CustomFieldOnblur: React.FC<Propiedades> = ({
  label,
  placeholder,
  name,
  setName,
  tipo,
  handleSave,
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
        onIonBlur={handleSave}
      />
    </div>
  );
};

export default CustomFieldOnblur;
