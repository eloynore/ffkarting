import { useNavigate } from "react-router-dom";
import { DriverProp } from "../helper/models";
import { useState, useEffect } from "react";
import { getImage } from "../helper/api";
import { useTranslation } from "react-i18next";

export function DriverLeaderboard({
  id,
  name,
  number,
  team,
  points,
}: Readonly<DriverProp>) {
  const [teamImage, setTeamImage] = useState<string>("");
  const { t } = useTranslation();
  let TeamLogo = "/logos/" + team.name + ".png";

  useEffect(() => {
    const response = getImage(TeamLogo);
    response.then((data) => (data ? setTeamImage(TeamLogo) : setTeamImage("")));
  }, [TeamLogo]);
  const pathToDetail = "/driver/" + id;
  const navigate = useNavigate();

  return (
    <tr>
      <td
        style={{
          background: "linear-gradient(65deg, #ffffff, 2%,#" + team.color + ")",
        }}
      >
        <div className="flex-row">
          {teamImage ? (
            <img
              className="helmet"
              src={teamImage}
              alt={name + " logo image"}
            />
          ) : (
            <></>
          )}
          <div>
            <p className="row-title left">#{number}</p>
            <p className="row-value left">{name}</p>
            <p className="row-title left">{team.name}</p>
          </div>
          <button
            style={{ float: "right" }}
            onClick={() => navigate(pathToDetail)}
          >
            <img
              className="helmet"
              src="/icons/right-arrow.svg"
              alt="Driver helmet"
            />
          </button>
        </div>
      </td>
      <td>
        <div>
          <p className="row-title">{t("points")}</p>
          <p className="row-value">{points}</p>
        </div>
      </td>
    </tr>
  );
}
