import { Button, Card, Descriptions, Popconfirm, Space, Tooltip } from "antd";
import { Certificate } from "../certificate.interface";
import CertificateLocation from "./CertificateLocation";
import DrawLocation from "./DrawLocation";

interface props {
  certificate: Certificate;
  onEdit: (id: number) => any;
  onDelete: (id: number) => any;
}

const CertificateItem = ({ certificate, onEdit, onDelete }: props) => {
  return (
    <Card
      key={certificate.id}
      type="inner"
      title={`Certificate id: ${certificate.id}`}
      cover={<DrawLocation locations={certificate.locations || []} certificateId={certificate.id!}/>}
      extra={
        <Space>
          <Button type="primary" ghost onClick={() => onEdit(certificate.id!)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this record? Cannot be rollback!"
            placement="bottomRight"
            onConfirm={() => onDelete(certificate.id!)}
            okText="Delete"
            cancelText="No"
            okButtonProps={{ ghost: true, danger: true }}
          >
            <Tooltip title="Remove">
              <Button danger>Delete</Button>
            </Tooltip>
          </Popconfirm>
        </Space>
      }
    >
      <CertificateLocation locations={certificate.locations} />
      <Descriptions title="Detail" extra={<Button>Add coordinates</Button>}>
        <Descriptions.Item label="OwnerName">
          {certificate.ownerName}
        </Descriptions.Item>
        <Descriptions.Item label="Land Parcel">
          {certificate.landParcel}
        </Descriptions.Item>
        <Descriptions.Item label="Map Sheet">
          {certificate.mapSheet}
        </Descriptions.Item>
        <Descriptions.Item label="Acreage">
          {certificate.acreage} m2
        </Descriptions.Item>
        <Descriptions.Item label="Address">
          {certificate.address}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default CertificateItem;
