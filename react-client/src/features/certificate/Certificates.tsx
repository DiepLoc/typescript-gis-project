import { Button, Card, message} from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import helperGetError from "../../common/utils/helperGetError";
import { Certificate } from "./certificate.interface";
import {
  addCertificate,
  deleteCertificate,
  editCertificate,
  getMoreCertificates,
  selectCertificates,
} from "./certificateSlice";
import CertificateItem from "./components/CertificateItem";
import FormModal from "./components/FormModal";
import './certificate.css'

const Certificates = () => {
  const certificates = useAppSelector<Certificate[]>(selectCertificates);
  const isFull = useAppSelector<boolean>((state) => state.certificate.isFull);
  const status = useAppSelector((state) => state.certificate.status);
  const error = useAppSelector((state) => state.certificate.error);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState<null | number>(null);

  const dispatch: AppDispatch = useAppDispatch();

  const getMore = () => {
    dispatch(getMoreCertificates());
  };

  useEffect(() => {
    if (certificates.length === 0) getMore();
  }, []);

  const handleAddOrEdit = async (formData: Certificate) => {
    try {
      if (currentId === null) {
        await dispatch(addCertificate(formData)).unwrap();
      } else
        await dispatch(
          editCertificate({ ...formData, id: currentId })
        ).unwrap();
      message.success("Success");
      onCancel();
    } catch (rejectedValueOrSerializedError) {
      message.error(helperGetError(rejectedValueOrSerializedError));
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteCertificate(id)).unwrap();
    } catch (rejectedValueOrSerializedError) {
      message.error(helperGetError(rejectedValueOrSerializedError));
    }
  };

  const onAddNew = () => {
    setCurrentId(null);
    setIsModalVisible(true);
  };

  const onEdit = (id: number) => {
    setCurrentId(id);
    setIsModalVisible(true);
  };

  const onCancel = () => {
    setIsModalVisible(false);
    setCurrentId(null);
  };

  const renderedCertificates = useMemo(
    () =>
      certificates.map((cer) => (
        <CertificateItem
          key={cer.id}
          certificate={cer}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      )),
    [certificates]
  );

  const renderedError =
    status === "failed" ? (
      <Text type="danger">{helperGetError(error)}</Text>
    ) : null;

  return (
    <div>
      {renderedError}
      <Card
        title="Certificate List"
        extra={
          <Button onClick={onAddNew} type="primary">
            Add new
          </Button>
        }
      >
        {renderedCertificates}
      </Card>
      <Button
        type="primary"
        hidden={isFull}
        loading={status === "loading"}
        onClick={getMore}
      >
        More
      </Button>
      <FormModal
        visible={isModalVisible}
        handleOk={handleAddOrEdit}
        onCancel={onCancel}
        initData={certificates.find((c) => c.id === currentId)}
        isLoading={status === "loading"}
      />
    </div>
  );
};

export default Certificates;
