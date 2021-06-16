import { useStaticQuery, graphql } from 'gatsby';

export function useNavItems() {
  const {
    allNavItemsYaml: { edges },
  } = useStaticQuery(graphql`
    query LEFT_NAV_QUERY {
      allNavItemsYaml {
        edges {
          node {
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

  const navItems = edges.map(({ node }) => {

    const menu = { ...node, name: node.label, icon: 'arrow_right_alt' };

    if (menu.subMenu) {
      menu.subMenu = menu.subMenu.map(item => {
        return {
          ...item,
          name: `${menu.name}.${item.label}`
        }
      })
    }

    return menu;
  }
  );
  return navItems;
}
