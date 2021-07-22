import { Button, Card, Descriptions } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import { Certificate } from "./certificate.interface";
import { getMoreCertificates, selectCertificates } from "./certificateSlice";

const Certificates = () => {
  const certificates = useAppSelector<Certificate[]>(selectCertificates);
  const dispatch : AppDispatch = useAppDispatch();

  const getMore = () => {
    dispatch(getMoreCertificates());
  };

  const renderedCertificate = certificates.map((cer) => (
    <Card type="inner" title={cer.id}>
      <Descriptions title="Info">
        <Descriptions.Item label="Address">{cer.address}</Descriptions.Item>
        <Descriptions.Item label="OwnerName">{cer.ownerName}</Descriptions.Item>
        <Descriptions.Item label="Land Parcel">
          {cer.landParcel}
        </Descriptions.Item>
        <Descriptions.Item label="Map Sheet">{cer.mapSheet}</Descriptions.Item>
        <Descriptions.Item label="Acreage">{cer.address}</Descriptions.Item>
      </Descriptions>
    </Card>
  ));

  return (
    <div>
      <Card title="Card title">
        {renderedCertificate}
      </Card>
      <Button type='primary' onClick={getMore}>More</Button>
    </div>
  );
};

export default Certificates;
