import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DriverParticipation } from "../components/DriverParticipation";
import { DriverProp, ParticipationsDriverProp } from "../helper/models";
import { getImage } from "../helper/api";
import { useTranslation } from "react-i18next";

type driverDetailData = {
  participations: ParticipationsDriverProp[];
  driver: DriverProp;
};

export function Driver() {
  const [driverDetailData, setDriverDetailData] = useState<driverDetailData>();
  const [teamImage, setTeamImage] = useState<string>("");
  const { t } = useTranslation();

  let { id } = useParams();
  useEffect(() => {
    if (id) {
      let driverId: number = +id;
      const fetchParticipations = async () => {
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/drivers/" +
            driverId +
            "/get_participations/"
        );
        response.json().then((data) => {
          setDriverDetailData(data);
          let TeamLogo = "/logos/" + data.driver.team.name + ".png";
          const response = getImage(TeamLogo);
          response.then((data) =>
            data ? setTeamImage(TeamLogo) : setTeamImage("")
          );
        });
      };
      fetchParticipations();
    }
  }, [id]);

  return (
    <div className="container-wrap">
      <section>
        <nav className="ladder-nav">
          <div className="ladder-title">
            <h1>Perfil de {driverDetailData?.driver.name}</h1>
          </div>
        </nav>
        <article className="driver-info">
          <div className="driver-data">
            <p>{driverDetailData?.driver.points}pts</p>
          </div>
          <div className="driver-data">
            <p># {driverDetailData?.driver.number}</p>
          </div>
          <div className="driver-data">
            {teamImage ? (
              <img
                className="helmet"
                src={teamImage}
                alt={driverDetailData?.driver.team.name + " logo image"}
              />
            ) : (
              <></>
            )}
            <p>{driverDetailData?.driver.team.name}</p>
          </div>
        </article>
        <table id="rankings" className="leaderboard-results driver-results">
          <thead style={{ display: "none" }}>
            <tr>
              <th>Circuito</th>
              <th>Posición</th>
              <th>{t("points")}</th>
            </tr>
          </thead>
          <tbody>
            {driverDetailData?.participations.length ? (
              driverDetailData.participations.map((item) => {
                return <DriverParticipation key={item.id} {...item} />;
              })
            ) : (
              <tr>
                <td colSpan={3} className="no-participations">
                  Sin carreras
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
