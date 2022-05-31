import {
  IonContent,
  IonPage,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonViewWillEnter,
  IonList,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonProgressBar,
} from "@ionic/react";
import React, { useState, useRef } from "react";
import { Header } from "../../components";
import { getPost } from "../../servicios";
const Post: React.FC = () => {
  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<Array<string>>([]);
  //const [page, setPage] = useState<any>(1);
  //const [control, setControl] = useState<any>(1);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  let page = 1;
  let control = 1;

  const pushData = (page: any) => {
    getPost(page)
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            console.log({ control, page });
            if (control === page) {
              setLoad(false);
              setData(data);
              console.log("igual");
            } else {
              //setControl(control + 1);
              console.log("concatenar");
              setData((prev) => [...prev, data.data]);
            }
          } else {
            setLoad(false);
            setData([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  const loadData = (ev: any) => {
    page = page + 1;
    pushData(page);
    console.log("Loaded data");
    ev.target.complete();
    if (data.length === 1000) {
      setInfiniteDisabled(true);
    }
  };

  useIonViewWillEnter(() => {
    pushData(1);
  });

  if (load) {
    return (
      <IonPage>
        <Header title="Consulta" isbotton={true} isBuger={false} />
        <IonContent fullscreen>
          <IonProgressBar type="indeterminate" color="success"></IonProgressBar>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <Header title="Conectado SS" isbotton={false} isBuger={false} />
      <IonContent fullscreen>
        <IonList>
          {data.map((item: any, index: any) => {
            return (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardSubtitle>{item?.slug ?? "valor"}</IonCardSubtitle>
                  <IonCardTitle>Card Title</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  Keep close to Nature's heart... and break clear away, once in
                  awhile, and climb a mountain or spend a week in the woods.
                  Wash your spirit clean.
                </IonCardContent>
              </IonCard>
            );
          })}
        </IonList>
        <IonInfiniteScroll
          onIonInfinite={loadData}
          threshold="100px"
          disabled={isInfiniteDisabled}
        >
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more data..."
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Post;
