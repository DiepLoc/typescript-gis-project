import { Button, Space } from "antd";
import { DeleteOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Location } from "../certificate.interface";
import { getDistance } from "../../../common/utils/helperLogic";

interface props {
  locations: Location[] | undefined;
}

const CertificateLocation = ({ locations }: props) => {
  if (!locations) return null;
  const sortedLocations = [...locations].sort((a, b) => a.order - b.order);
  const renderedLocations = sortedLocations.map((location, index) => {
    const { longitudeX, latitudeY } = location;

    let distance: string | null = null;
    if (index !== 0) {
      distance = getDistance(
        sortedLocations[index - 1].longitudeX,
        sortedLocations[index - 1].latitudeY,
        longitudeX,
        latitudeY
      );
    }
    return (
      <div className="render-certificate-location">
        <Space>
          {distance && <span>{distance}m -</span>}
          <span>Longtitude X: {longitudeX}</span>/
          <span>Latitude Y: {latitudeY}</span>
          <Button size="small" icon={<DownOutlined />}></Button>
          <Button size="small" icon={<UpOutlined />}></Button>
          <Button size="small" icon={<DeleteOutlined />}></Button>
        </Space>
      </div>
    );
  });
  return <div>{renderedLocations}</div>;
};

export default CertificateLocation;
