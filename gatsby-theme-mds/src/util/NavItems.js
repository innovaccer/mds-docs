import { useStaticQuery, graphql } from 'gatsby';

export function useNavItems(relativePagePath) {
  const {
    allNavYaml: { nodes },
  } = useStaticQuery(graphql`
    query LEFT_NAV_QUERY {
      allNavYaml {
        nodes {
          base
          menus {
            label
            link
            subMenu {
              label
              link
            }
          }
        }
      }
    }
  `);

  const getKey = (nodes, relativePath) => {
    const keys = nodes.map((elt) => {
      return elt.base;
    });
    const sortedKeys = keys
      .sort((a, b) => {
        const diff = a.split('/').length - b.split('/').length;
        const val = diff ? diff : a.localeCompare(b);
        return val;
      })
      .reverse();
    let value = 'default';
    sortedKeys.some((key) => {
      const isPresent = relativePath.includes(key);
      const nextValue = relativePath[key.length];
      if (isPresent && (!nextValue || nextValue === '/')) {
        value = key;
        return true;
      }
      return false;
    });

    return value;
  }

  const pagePath = relativePagePath.replace('/', '').split('.')[0];

  const navPage = getKey(nodes, pagePath);

  const navData = nodes.filter((node) => {
    return node.base === navPage;
  });

  const navItems = navData[0].menus.map((node) => {
    const menu = { ...node, name: node.label };

    if (menu.subMenu) {
      menu.subMenu = menu.subMenu.map((item) => {
        return {
          ...item,
          name: `${menu.name}.${item.label}`,
        };
      });
    }

    return menu;
  });
  return navItems;
}
