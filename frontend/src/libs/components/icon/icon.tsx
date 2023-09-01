import { type IconNames } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/get-valid-class-names.js';
import { iconNameToPlainSvgMap } from '#libs/maps/icon-name-to-plain-svg.js';

import styles from './styles.module.scss';

type Properties = {
  name: IconNames;
  className?: string;
};

const Icon: React.FC<Properties> = ({ name, className = '' }) => {
  const SelectedIcon = iconNameToPlainSvgMap[name];

  const cssClass = getValidClassNames(styles[className]);

  return <SelectedIcon className={cssClass} />;
};

export { Icon };
