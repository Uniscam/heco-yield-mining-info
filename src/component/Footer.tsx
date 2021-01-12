import React from "react";
import { ExternalLink } from "./ExternalLink";

export const Footer: React.FC = () => <>
    <pre>{
        `README on GitHub
Donation: `}
<ExternalLink to="https://frankwei.argent.xyz">frankwei.argent.xyz (On ETH Network Only)</ExternalLink>
        {`
0x7fd97686785Cb93098FA25d0D6c47Cb0513B9A01 (On BSC/HECO)
`}</pre>
</> 