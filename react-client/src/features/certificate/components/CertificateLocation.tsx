import { Button, Space } from "antd";
import { DeleteOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Location } from "../certificate.interface";

interface props {
  locations: Location[] | undefined;
}

const CertificateLocation = ({ locations }: props) => {
  if (!locations) return null;
  const sortedLocations = [...locations].sort((a, b) => b.order - a.order);
  const renderedLocations = sortedLocations.map((location) => {
    return (
      <div className="render-certificate-location">
        <Space>
          <span>Longtitude X: {location.longitudeX}</span>/
          <span>Latitude Y: {location.latitudeY}</span>
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
