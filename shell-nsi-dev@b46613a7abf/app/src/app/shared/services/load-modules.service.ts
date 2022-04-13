import { loadRemoteModule } from '@angular-architects/module-federation';
import { Injectable } from '@angular/core';
import { ToolbarConfig } from '@interfaces/toolbar-config';
import { forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { microFrontends } from '../../../micro-frontends';

@Injectable({
  providedIn: 'root',
})
export class LoadModulesService {
  public toolbarConfig: ToolbarConfig = {};

  /**
   * Подгружает из expose в микрофронте необходимый модуль по его имени
   * @param remoteName - имя микрофронта
   * @param remoteEntry - адрес микрофронта
   * @param moduleName - имя модуля из микрофронта, который необходимо подтянуть
   * @returns промис с загруженным модулем
   */
  public async loadExposedModule(remoteName: string, remoteEntry: string, moduleName: string): Promise<any> {
    let result;
    try {
      console.log(`loading exposed module: ${remoteName} | ${remoteEntry} | ${moduleName}`);
      const module = await loadRemoteModule({
        remoteName,
        remoteEntry,
        exposedModule: `./${moduleName}`,
      });
      result = module?.default;
    } catch (error) {
      console.log(`exposed module load failure for ${remoteName} | ${remoteEntry} | ${moduleName}`, error);
      result = {};
    }
    return result;
  }

  public async loadToolbarConfig() {
    this.toolbarConfig = {
      ...(await this.loadExposedModule('handbooks', window.env.MF_NSI_HANDBOOKS, 'ToolbarConfig')),
      ...(await this.loadExposedModule('law', window.env.MF_PAIP_LAW, 'ToolbarConfig')),
      ...(await this.loadExposedModule('calendar', window.env.MF_PAIP_CALENDAR, 'ToolbarConfig')),
      ...(await this.loadExposedModule('campaigns', window.env.MF_CAMPAIGNS, 'ToolbarConfig')),
      ...(await this.loadExposedModule('commissions', window.env.MF_COMMISSIONS, 'ToolbarConfig')),
      ...(await this.loadExposedModule('candidates', window.env.MF_CANDIDATES, 'ToolbarConfig')),
      ...(await this.loadExposedModule('tvd', window.env.MF_TVD, 'ToolbarConfig')),
    };
  }

  public loadToolbarConfig$(): Observable<ToolbarConfig> {
    const toolbarConfigsLoadModulePromisesList = microFrontends.map((mfe) => {
      return this.loadExposedModule(mfe.remoteName, mfe.remoteEntry, 'ToolbarConfig');
    });
    const rx = forkJoin(toolbarConfigsLoadModulePromisesList);
    return rx.pipe(
      map((array) => {
        return array.reduce((config, configItem) => {
          Object.assign(config, configItem);
          return config;
        }, {} as ToolbarConfig);
      }),
      tap((config) => {
        this.toolbarConfig = config;
      }),
    );
  }

  public async loadHeaderRoleConfig() {
    return {
      ...(await this.loadExposedModule('campaigns', window.env.MF_CAMPAIGNS, 'HeaderRoleConfig')),
    };
  }
}
