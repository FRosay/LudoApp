import React, { useState } from 'react';


function Member(props) {

  const [shortDisplay] = useState(props.shortDisplay ? props.shortDisplay : false);
  const [nameInfo]     = useState({firstName: props.firstName, lastName: props.lastName, fullName: (props.firstName + ' ' + props.lastName)});
  const [adressInfo]   = useState({adress: props.adress, postalCode: props.postalCode, city: props.city})
  const [contactInfo]  = useState({phoneHome: props.phoneHome, phoneMobile: props.phoneMobile, email: props.email})
  const [memberInfo]   = useState({memberId: props.memberId, contribution: props.contribution, contributionRate: props.contributionRate})


  if (shortDisplay === true) {
    return (
      <div>
        <p>
          Prénom(s) : { nameInfo.firstName } <br />
          Nom : { nameInfo.lastName }
        </p>
      </div>
    )
  } else {
    return (
      <div>
        <p>
          Prénom(s) : { nameInfo.firstName } <br />
          Nom : { nameInfo.lastName }
        </p>
        <p>
          Adresse : { adressInfo.adress } <br />
          Code postal : { adressInfo.postalCode } <br />
          Ville : { adressInfo.city }
        </p>
        <p>
          Téléphone fixe : { contactInfo.phoneHome } <br />
          Téléphone portable : { contactInfo.phoneMobile } <br />
          Adresse mail : { contactInfo.email }
        </p>
        <p>
          Cotisation : { memberInfo.contribution } € <br />
          Taux de cotisation : { memberInfo.contributionRate } %
        </p>
      </div>
    )
  }
}

export default Member;