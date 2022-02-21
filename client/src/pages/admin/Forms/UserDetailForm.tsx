import React, { Dispatch, SetStateAction } from "react";
import CommonModal from "components/CommonModal/CommonModal";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import { Rating } from "@mui/material";

interface UserDetailFormProps {
  openUserDetailForm: boolean;
  setOpenUserDetailForm: Dispatch<SetStateAction<boolean>>;
  selectedUser: User.userType;
}

const UserDetailFormContainer = styled.div`
  li {
    margin: 5px 0;
    list-style: none;
    display: flex;
    align-items: center;

    h3 {
      display: inline;
      margin-bottom: 0px;
    }

    & > span {
      margin-left: 10px;
    }
  }
`;

const UserDetailForm = ({
  openUserDetailForm,
  setOpenUserDetailForm,
  selectedUser,
}: UserDetailFormProps) => {
  return (
    <CommonModal
      open={openUserDetailForm}
      setOpen={setOpenUserDetailForm}
      title="User Detail"
    >
      <UserDetailFormContainer>
        <ul>
          <li>
            <h3>id : </h3>
            <span>{selectedUser.id}</span>
          </li>
          <li>
            <h3>email : </h3>
            <span>{selectedUser.email}</span>
          </li>

          <li>
            <h3>title : </h3>
            <span>{selectedUser.title}</span>
          </li>

          <li>
            <h3>role : </h3>
            <span>{selectedUser.role}</span>
          </li>
          <li>
            <h3>lastName : </h3>
            <span>{selectedUser.lastName}</span>
          </li>
          <li>
            <h3>firstName : </h3>
            <span>{selectedUser.firstName}</span>
          </li>
          <Divider />

          <li>
            <h3>university : </h3>
            <span>{selectedUser.university}</span>
          </li>
          <li>
            <h3>institute : </h3>
            <span>{selectedUser.institute}</span>
          </li>
          <Divider />

          <li>
            <h3>street : </h3>
            <span>{selectedUser.street}</span>
          </li>
          <li>
            <h3>zipCode : </h3>
            <span>{selectedUser.zipCode}</span>
          </li>
          <li>
            <h3>city : </h3>
            <span>{selectedUser.city}</span>
          </li>
          <Divider />
          <li>
            <h3>researchField : </h3>
            <span>{selectedUser.researchField}</span>
          </li>
          <li>
            <h3>afmTool : </h3>
            <span>{selectedUser.afmTool}</span>
          </li>
          <Divider />

          {selectedUser.nanomechanical && (
            <li>
              <h3>nanomechanical : </h3>
              <span>
                <Rating
                  name="readOnly "
                  value={selectedUser.nanomechanical}
                  readOnly
                />
              </span>
            </li>
          )}
          {selectedUser.characterization_of_soft && (
            <li>
              <h3>characterization_of_soft : </h3>
              <span>
                <Rating
                  name="readOnly "
                  value={selectedUser.characterization_of_soft}
                  readOnly
                />
              </span>
            </li>
          )}
          {selectedUser.advanced_imaging && (
            <li>
              <h3>advanced_imaging : </h3>
              <span>
                <Rating
                  name="readOnly "
                  value={selectedUser.advanced_imaging}
                  readOnly
                />
              </span>
            </li>
          )}
          {selectedUser.high_resolution_imaging && (
            <li>
              <h3>high_resolution_imaging : </h3>
              <span>
                <Rating
                  name="readOnly "
                  value={selectedUser.high_resolution_imaging}
                  readOnly
                />
              </span>
            </li>
          )}
          {selectedUser.automation_in_afm && (
            <li>
              <h3>automation_in_afm : </h3>
              <span>
                <Rating
                  name="readOnly "
                  value={selectedUser.automation_in_afm}
                  readOnly
                />
              </span>
            </li>
          )}
          <Divider />
          <li>
            <h3>registration : </h3>
            <span>{selectedUser.createdAt.substring(0, 10)}</span>
          </li>
          <li>
            <h3>ps_opt_in : </h3>
            <span>{selectedUser.ps_opt_in}</span>
          </li>
        </ul>
      </UserDetailFormContainer>
    </CommonModal>
  );
};

export default UserDetailForm;
