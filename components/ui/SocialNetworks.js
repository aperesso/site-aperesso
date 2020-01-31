import React , { memo } from 'react';

import '../../scss/ui/social-networks.scss'

const SocialNetworks = () => {
    return (
        <div className="social-networks">
            <ul>
                <li> <a href="https://codepen.io/aperesso" target="blank" ><img src='/assets/icons/codepen.svg'/></a> </li>
                <li> <a href="https://www.linkedin.com/in/alexia-peresson-2a8985131/" target="blank" ><img src='/assets/icons/linkedin.svg'/></a></li>
                <li> <a href="https://github.com/aperesso" target='blank'><img src='/assets/icons/github.svg'/></a></li>
            </ul>
        </div>
    );
}

export default memo(SocialNetworks)